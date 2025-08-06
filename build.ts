import path from 'path';
import { spawn } from 'bun';
import { watch } from 'fs';

const BUILD_DIR = 'build';
const SRC_DIR = 'src';

interface BuildConfig {
  entryPoints: Record<string, string>;
  outdir: string;
  external?: string[];
}

const config: BuildConfig = {
  entryPoints: {
    'background-entry': path.join(SRC_DIR, 'background-entry.ts'),
    'content-entry': path.join(SRC_DIR, 'content-entry.ts'),
    'inject-entry': path.join(SRC_DIR, 'inject-entry.ts'),
    'popup-entry': path.join(SRC_DIR, 'extension/popup/popup-entry.tsx'),
  },
  outdir: BUILD_DIR,
  external: ['chrome']
};

async function build() {
  console.log('Building Kingdom Pilot...');
  
  try {
    const result = await Bun.build({
      entrypoints: Object.values(config.entryPoints),
      outdir: config.outdir,
      target: 'browser',
      format: 'iife',
      minify: false,
      sourcemap: 'external',
      external: config.external,
      naming: {
        entry: '[name].js'
      }
    });

    if (result.success) {
      console.log('Build completed successfully');
      console.log(`Output directory: ${config.outdir}`);
      
      await copyStaticFiles();
      
      console.log('All files processed');
      return true;
    } else {
      console.error('Build failed:');
      result.logs.forEach(log => console.error(log));
      return false;
    }
  } catch (error) {
    console.error('Build error:', error);
    return false;
  }
}

async function copyStaticFiles() {
  const staticFiles = [
    { src: 'manifest.json', dest: 'manifest.json' },
    { src: 'public/icons/icon80.png', dest: 'icon80.png' },
    { src: 'popup.html', dest: 'popup.html' }
  ];

  for (const file of staticFiles) {
    try {
      await Bun.write(
        path.join(BUILD_DIR, file.dest),
        await Bun.file(file.src).arrayBuffer()
      );
      console.log(`Copied ${file.src} -> ${file.dest}`);
    } catch (error) {
      console.warn(`Could not copy ${file.src}:`, error);
    }
  }
}

class DevServer {
  private isBuilding = false;
  private buildQueue = false;

  constructor() {
    this.start();
  }

  private async start(): Promise<void> {
    console.log('Starting Kingdom Pilot Development Server...');
    console.log('Watching for file changes...');
    
    await this.runBuild();
    this.setupWatcher();
    
    console.log('Development server started!');
    console.log('Make changes to your files and they will be automatically rebuilt.');
    console.log('Load/reload the unpacked extension in Chrome from the build/ folder.');
    
    process.stdin.resume();
  }

  private setupWatcher(): void {
    const watchPaths = ['src', 'manifest.json', 'popup.html', 'public'];

    watchPaths.forEach(watchPath => {
      if (require('fs').existsSync(watchPath)) {
        watch(watchPath, { recursive: true }, (eventType, filename) => {
          if (filename && this.shouldRebuild(filename)) {
            console.log(`Changed: ${filename}`);
            this.debouncedBuild();
          }
        });
        console.log(`Watching: ${watchPath}`);
      }
    });
  }

  private shouldRebuild(filename: string): boolean {
    const excludePatterns = [
      /\.git/,
      /node_modules/,
      /build/,
      /\.DS_Store/,
      /\.swp$/,
      /\.tmp$/,
      /~$/,
      /\.map$/
    ];

    return !excludePatterns.some(pattern => pattern.test(filename));
  }

  private debouncedBuild = this.debounce(async () => {
    if (this.isBuilding) {
      this.buildQueue = true;
      return;
    }
    
    await this.runBuild();
    
    if (this.buildQueue) {
      this.buildQueue = false;
      setTimeout(() => this.debouncedBuild(), 100);
    }
  }, 300);

  private debounce(func: Function, wait: number): () => void {
    let timeout: NodeJS.Timeout;
    return function(this: any, ...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  private async runBuild(): Promise<void> {
    if (this.isBuilding) return;

    this.isBuilding = true;
    console.log('Building...');
    
    try {
      const success = await build();
      if (success) {
        console.log('Build completed');
      } else {
        console.error('Build failed');
      }
    } catch (error) {
      console.error('Build failed:', error);
    } finally {
      this.isBuilding = false;
    }
  }
}

// Check if this is a dev server run
const isDevMode = process.argv.includes('--dev');

if (isDevMode) {
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down dev server...');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\nShutting down dev server...');
    process.exit(0);
  });

  new DevServer();
} else {
  // Single build
  build().then(success => {
    process.exit(success ? 0 : 1);
  });
}