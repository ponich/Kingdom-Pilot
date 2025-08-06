export type GameEntityType =
  | 'game.service.common.FUser'
  | 'game.service.kingdom.FKingdom'
  | 'game.service.city.FCity'
  | 'flex.messaging.io.ArrayCollection'
  | 'game.service.mail.FMailBox'
  | 'game.service.alliance.FDiplomacy'
  | 'game.service.mission.FPrepareMission'
  | 'game.service.action.FEspionageResult'
  | 'game.service.quest.FQuestBox'
  | 'game.service.common.FRating'
  | 'game.service.action.FObservationResult'
  | 'game.service.city.FMarket'
  | 'game.service.mission.FMission'
  | 'game.model.mission.ArmyInBattle'
  | 'unknown';

export interface GameResponse {
  g?: {
    ne?: GameEntityType;
  };
  body?: unknown;
  source?: unknown;
}
