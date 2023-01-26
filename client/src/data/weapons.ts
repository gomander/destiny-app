import {
  Weapon, WeaponType, DamageType, AmmoType, WeaponSlot, AutoRifleFrame,
  BowFrame, FusionRifleFrame, GlaiveFrame, GrenadeLauncherFrame,
  HandCannonFrame, LinearFusionRifleFrame, MachineGunFrame, PulseRifleFrame,
  RocketLauncherFrame, ScoutRifleFrame, ShotgunFrame, SidearmFrame,
  SniperRifleFrame, SubmachineGunFrame, SwordFrame, TraceRifleFrame
} from 'src/components/models'

export const weapons: Weapon[] = [
  {
    name: 'Firefright',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.AutoRifle,
    season: 17,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: AutoRifleFrame.Precision
  },
  {
    name: 'Come to Pass',
    damageType: DamageType.Arc,
    weaponType: WeaponType.AutoRifle,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: AutoRifleFrame.HighImpact
  },
  {
    name: 'Sweet Sorrow',
    damageType: DamageType.Arc,
    weaponType: WeaponType.AutoRifle,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: AutoRifleFrame.RapidFire
  },
  {
    name: 'Ammit AR2',
    damageType: DamageType.Solar,
    weaponType: WeaponType.AutoRifle,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: AutoRifleFrame.Precision
  },
  {
    name: 'Fel Taradiddle',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.Bow,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: BowFrame.Lightweight
  },
  {
    name: 'Under Your Skin',
    damageType: DamageType.Void,
    weaponType: WeaponType.Bow,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: BowFrame.Precision
  },
  {
    name: 'Tripwire Canary',
    damageType: DamageType.Arc,
    weaponType: WeaponType.Bow,
    season: 19,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: BowFrame.Lightweight
  },
  {
    name: 'Deliverance',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.FusionRifle,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: FusionRifleFrame.Precision
  },
  {
    name: 'Likely Suspect',
    damageType: DamageType.Void,
    weaponType: WeaponType.FusionRifle,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: FusionRifleFrame.RapidFire
  },
  {
    name: 'The Epicurean',
    damageType: DamageType.Void,
    weaponType: WeaponType.FusionRifle,
    season: 17,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: FusionRifleFrame.Precision
  },
  {
    name: 'Midha\'s Reckoning',
    damageType: DamageType.Arc,
    weaponType: WeaponType.FusionRifle,
    season: 18,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: FusionRifleFrame.HighImpact
  },
  {
    name: 'The Enigma',
    damageType: DamageType.Void,
    weaponType: WeaponType.Glaive,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: GlaiveFrame.Adaptive
  },
  {
    name: 'Lubrae\'s Ruin',
    damageType: DamageType.Solar,
    weaponType: WeaponType.Glaive,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: GlaiveFrame.Adaptive
  },
  {
    name: 'Nezarec\'s Whisper',
    damageType: DamageType.Arc,
    weaponType: WeaponType.Glaive,
    season: 17,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: GlaiveFrame.Adaptive
  },
  {
    name: 'Judgment of Kelgorath',
    damageType: DamageType.Solar,
    weaponType: WeaponType.Glaive,
    season: 19,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: GlaiveFrame.Aggressive
  },
  {
    name: 'Explosive Personality',
    damageType: DamageType.Solar,
    weaponType: WeaponType.GrenadeLauncher,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: GrenadeLauncherFrame.Wave
  },
  {
    name: 'Forbearance',
    damageType: DamageType.Arc,
    weaponType: WeaponType.GrenadeLauncher,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: GrenadeLauncherFrame.Wave
  },
  {
    name: 'Pardon Our Dust',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.GrenadeLauncher,
    season: 18,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: GrenadeLauncherFrame.Lightweight
  },
  {
    name: 'Tarnation',
    damageType: DamageType.Arc,
    weaponType: WeaponType.GrenadeLauncher,
    season: 16,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: GrenadeLauncherFrame.RapidFire
  },
  {
    name: 'Austringer',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.HandCannon,
    season: 17,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: HandCannonFrame.Adaptive
  },
  {
    name: 'Zaouli\'s Bane',
    damageType: DamageType.Solar,
    weaponType: WeaponType.HandCannon,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: HandCannonFrame.Adaptive
  },
  {
    name: 'IKELOS_HC_v1.0.3',
    damageType: DamageType.Void,
    weaponType: WeaponType.HandCannon,
    season: 19,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: HandCannonFrame.Precision
  },
  {
    name: 'Posterity',
    damageType: DamageType.Arc,
    weaponType: WeaponType.HandCannon,
    season: 19,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: HandCannonFrame.Precision
  },
  {
    name: 'Cataclysmic',
    damageType: DamageType.Solar,
    weaponType: WeaponType.LinearFusionRifle,
    season: 16,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: LinearFusionRifleFrame.Precision
  },
  {
    name: 'Taipan-4fr',
    damageType: DamageType.Void,
    weaponType: WeaponType.LinearFusionRifle,
    season: 18,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: LinearFusionRifleFrame.Precision
  },
  {
    name: 'Sailspy Pitchglass',
    damageType: DamageType.Arc,
    weaponType: WeaponType.LinearFusionRifle,
    season: 18,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: LinearFusionRifleFrame.Precision
  },
  {
    name: 'Fire and Forget',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.LinearFusionRifle,
    season: 19,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: LinearFusionRifleFrame.Aggressive
  },
  {
    name: 'Recurrent Impact',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.MachineGun,
    season: 16,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: MachineGunFrame.RapidFire
  },
  {
    name: 'Fixed Odds',
    damageType: DamageType.Solar,
    weaponType: WeaponType.MachineGun,
    season: 17,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: MachineGunFrame.HighImpact
  },
  {
    name: 'Qullim\'s Terminus',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.MachineGun,
    season: 18,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: MachineGunFrame.HighImpact
  },
  {
    name: 'Planck\'s Stride',
    damageType: DamageType.Arc,
    weaponType: WeaponType.MachineGun,
    season: 18,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: MachineGunFrame.RapidFire
  },
  {
    name: 'Retrofit Escapade',
    damageType: DamageType.Void,
    weaponType: WeaponType.MachineGun,
    season: 19,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: MachineGunFrame.RapidFire
  },
  {
    name: 'Commemoration',
    damageType: DamageType.Void,
    weaponType: WeaponType.MachineGun,
    season: 19,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: MachineGunFrame.Adaptive
  },
  {
    name: 'Syncopation-53',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.PulseRifle,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: PulseRifleFrame.Adaptive
  },
  {
    name: 'Insidious',
    damageType: DamageType.Arc,
    weaponType: WeaponType.PulseRifle,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: PulseRifleFrame.AggressiveBurst
  },
  {
    name: 'Piece of Mind',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.PulseRifle,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: PulseRifleFrame.RapidFire
  },
  {
    name: 'Smite of Merain',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.PulseRifle,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: PulseRifleFrame.Adaptive
  },
  {
    name: 'BxR-55 Battler',
    damageType: DamageType.Solar,
    weaponType: WeaponType.PulseRifle,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: PulseRifleFrame.Lightweight
  },
  {
    name: 'Palmyra-B',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.RocketLauncher,
    season: 16,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: RocketLauncherFrame.Precision
  },
  {
    name: 'Red Herring',
    damageType: DamageType.Void,
    weaponType: WeaponType.RocketLauncher,
    season: 16,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: RocketLauncherFrame.Adaptive
  },
  {
    name: 'Bump in the Night',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.RocketLauncher,
    season: 17,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: RocketLauncherFrame.Aggressive
  },
  {
    name: 'Pointed Inquiry',
    damageType: DamageType.Void,
    weaponType: WeaponType.ScoutRifle,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: ScoutRifleFrame.HighImpact
  },
  {
    name: 'Tears of Contrition',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.ScoutRifle,
    season: 17,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: ScoutRifleFrame.Precision
  },
  {
    name: 'Doom of Chelchis',
    damageType: DamageType.Void,
    weaponType: WeaponType.ScoutRifle,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: ScoutRifleFrame.Precision
  },
  {
    name: 'Tarnished Mettle',
    damageType: DamageType.Arc,
    weaponType: WeaponType.ScoutRifle,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: ScoutRifleFrame.Lightweight
  },
  {
    name: 'Trustee',
    damageType: DamageType.Solar,
    weaponType: WeaponType.ScoutRifle,
    season: 19,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: ScoutRifleFrame.RapidFire
  },
  {
    name: 'Empirical Evidence',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.Sidearm,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: SidearmFrame.AggressiveBurst
  },
  {
    name: 'Drang (Baroque)',
    damageType: DamageType.Solar,
    weaponType: WeaponType.Sidearm,
    season: 17,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: SidearmFrame.Adaptive
  },
  {
    name: 'Brigand\'s Law',
    damageType: DamageType.Arc,
    weaponType: WeaponType.Sidearm,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: SidearmFrame.RapidFire
  },
  {
    name: 'Forensic Nightmare',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.SubmachineGun,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: SubmachineGunFrame.Precision
  },
  {
    name: 'Submission',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.SubmachineGun,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: SubmachineGunFrame.Lightweight
  },
  {
    name: 'CALUS Mini-Tool',
    damageType: DamageType.Solar,
    weaponType: WeaponType.SubmachineGun,
    season: 17,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: SubmachineGunFrame.Lightweight
  },
  {
    name: 'Blood Feud',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.SubmachineGun,
    season: 18,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: SubmachineGunFrame.Aggressive
  },
  {
    name: 'IKELOS_SMG_v1.0.3',
    damageType: DamageType.Arc,
    weaponType: WeaponType.SubmachineGun,
    season: 19,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: SubmachineGunFrame.Aggressive
  },
  {
    name: 'Ragnhild-D',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.Shotgun,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: ShotgunFrame.Aggressive
  },
  {
    name: 'Without Remorse',
    damageType: DamageType.Solar,
    weaponType: WeaponType.Shotgun,
    season: 17,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: ShotgunFrame.Lightweight
  },
  {
    name: 'No Reprieve',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.Shotgun,
    season: 18,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: ShotgunFrame.PinpointSlug
  },
  {
    name: 'Wastelander M5',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.Shotgun,
    season: 18,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: ShotgunFrame.Lightweight
  },
  {
    name: 'IKELOS_SG_v1.0.3',
    damageType: DamageType.Solar,
    weaponType: WeaponType.Shotgun,
    season: 19,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: ShotgunFrame.RapidFire
  },
  {
    name: 'Heritage',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.Shotgun,
    season: 19,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: ShotgunFrame.PinpointSlug
  },
  {
    name: 'Thoughtless',
    damageType: DamageType.Stasis,
    weaponType: WeaponType.SniperRifle,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: SniperRifleFrame.Adaptive
  },
  {
    name: 'Father\'s Sins',
    damageType: DamageType.Void,
    weaponType: WeaponType.SniperRifle,
    season: 16,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: SniperRifleFrame.RapidFire
  },
  {
    name: 'Beloved',
    damageType: DamageType.Solar,
    weaponType: WeaponType.SniperRifle,
    season: 17,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: SniperRifleFrame.Adaptive
  },
  {
    name: 'Defiance of Yasmin',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.SniperRifle,
    season: 18,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: SniperRifleFrame.Adaptive
  },
  {
    name: 'IKELOS_SR_v1.0.3',
    damageType: DamageType.Solar,
    weaponType: WeaponType.SniperRifle,
    season: 19,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: SniperRifleFrame.RapidFire
  },
  {
    name: 'Succession',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.SniperRifle,
    season: 19,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Kinetic,
    frame: SniperRifleFrame.Aggressive
  },
  {
    name: 'Hollow Denial',
    damageType: DamageType.Void,
    weaponType: WeaponType.TraceRifle,
    season: 17,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: TraceRifleFrame.Adaptive
  },
  {
    name: 'Retraced Path',
    damageType: DamageType.Solar,
    weaponType: WeaponType.TraceRifle,
    season: 18,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: TraceRifleFrame.Adaptive
  },
  {
    name: 'Path of Least Resistance',
    damageType: DamageType.Arc,
    weaponType: WeaponType.TraceRifle,
    season: 19,
    ammoType: AmmoType.Special,
    slot: WeaponSlot.Energy,
    frame: TraceRifleFrame.Adaptive
  },
  {
    name: 'Half-Truths',
    damageType: DamageType.Arc,
    weaponType: WeaponType.Sword,
    season: 18,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: SwordFrame.Adaptive
  },
  {
    name: 'The Other Half',
    damageType: DamageType.Void,
    weaponType: WeaponType.Sword,
    season: 18,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: SwordFrame.Adaptive
  },
  {
    name: 'Bequest',
    damageType: DamageType.Arc,
    weaponType: WeaponType.Sword,
    season: 19,
    ammoType: AmmoType.Heavy,
    slot: WeaponSlot.Power,
    frame: SwordFrame.Adaptive
  },
]