export enum DeathCauses {
  MOD_UNKNOWN = 'MOD_UNKNOWN',
  MOD_SHOTGUN = 'MOD_SHOTGUN',
  MOD_GAUNTLET = 'MOD_GAUNTLET',
  MOD_MACHINEGUN = 'MOD_MACHINEGUN',
  MOD_GRENADE = 'MOD_GRENADE',
  MOD_GRENADE_SPLASH = 'MOD_GRENADE_SPLASH',
  MOD_ROCKET = 'MOD_ROCKET',
  MOD_ROCKET_SPLASH = 'MOD_ROCKET_SPLASH',
  MOD_PLASMA = 'MOD_PLASMA',
  MOD_PLASMA_SPLASH = 'MOD_PLASMA_SPLASH',
  MOD_RAILGUN = 'MOD_RAILGUN',
  MOD_LIGHTNING = 'MOD_LIGHTNING',
  MOD_BFG = 'MOD_BFG',
  MOD_BFG_SPLASH = 'MOD_BFG_SPLASH',
  MOD_WATER = 'MOD_WATER',
  MOD_SLIME = 'MOD_SLIME',
  MOD_LAVA = 'MOD_LAVA',
  MOD_CRUSH = 'MOD_CRUSH',
  MOD_TELEFRAG = 'MOD_TELEFRAG',
  MOD_FALLING = 'MOD_FALLING',
  MOD_SUICIDE = 'MOD_SUICIDE',
  MOD_TARGET_LASER = 'MOD_TARGET_LASER',
  MOD_TRIGGER_HURT = 'MOD_TRIGGER_HURT',
  MOD_NAIL = 'MOD_NAIL', // #ifdef MISSIONPACK
  MOD_CHAINGUN = 'MOD_CHAINGUN',
  MOD_PROXIMITY_MINE = 'MOD_PROXIMITY_MINE',
  MOD_KAMIKAZE = 'MOD_KAMIKAZE',
  MOD_JUICED = 'MOD_JUICED', // #endif
  MOD_GRAPPLE = 'MOD_GRAPPLE',
}

/**
 * workaround on enum error TS7053: Element implicitly has an 'any' type because expression of type '"deathCauseIndex"' can't be used to index type 'typeof DeathCauses'.
 Property 'deathCauseIndex' does not exist on type 'typeof DeathCauses'
 * */
export const deathCauseMapping: Record<number | string, DeathCauses> = {};
let count = 0;
for (const key in DeathCauses) {
  const enumKey = key as keyof typeof DeathCauses;
  const value = DeathCauses[enumKey];
  if (typeof value === 'string') {
    deathCauseMapping[count] = value;
  }
  count++;
}
