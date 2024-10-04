const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharSchema = new Schema({
    ownerID: String,
    
//IDENTITY
    chaName: String,
    culture: String,
    race: String,
    faith: String,
    breakpoint: String,
    carrer: String,
    features: String,
    languages: String,

//VIRTUES    
    mgt: Number,
    fin: Number,
    ins: Number,
    cha: Number,
    eru: Number,
    wpw: Number,
    
    mgt_stress: Number,
    fin_stress: Number,
    ins_stress: Number,
    cha_stress: Number,
    eru_stress: Number,
    wpw_stress: Number,

//MASTERIES
    //Training
    melee_weapons: Number,
    mw_specs: String,
    mw_reroll: Boolean,
    mw_flaw: Boolean,

    ranged_weapons: Number,
    rw_specs: String,
    rw_reroll: Boolean,
    rw_flaw: Boolean,

    catalysts: Number,
    cata_specs: String,
    cata_reroll: Boolean,
    cata_flaw: Boolean,

    talents: Number,
    tale_specs: String,
    tale_reroll: Boolean,
    tale_flaw: Boolean,

    brawl: Number,
    brawl_specs: String,
    brawl_reroll: Boolean,
    brawl_flaw: Boolean,

    defence: Number,
    def_specs: String,
    def_reroll: Boolean,
    def_flaw: Boolean,

    //Proficiency
    survival: Number,
    surv_specs: String,
    surv_reroll: Boolean,
    surv_flaw: Boolean,

    exploring: Number,
    ex_specs: String,
    ex_reroll: Boolean,
    ex_flaw: Boolean,

    subterfuge: Number,
    sub_specs: String,
    sub_reroll: Boolean,
    sub_flaw: Boolean,

    persuasion: Number,
    per_specs: String,
    per_reroll: Boolean,
    per_flaw: Boolean,

    art: Number,
    art_specs: String,
    art_reroll: Boolean,
    art_flaw: Boolean,

    medicine: Number,
    med_specs: String,
    med_reroll: Boolean,
    med_flaw: Boolean,

    //Lore
    academics: Number,
    aca_specs: String,
    aca_reroll: Boolean,
    aca_flaw: Boolean,

    urban: Number,
    urb_specs: String,
    urb_reroll: Boolean,
    urb_flaw: Boolean,

    arcane: Number,
    arcane_specs: String,
    arcane_reroll: Boolean,
    arcane_flaw: Boolean,

    kosmology: Number,
    kosm_specs: String,
    kosm_reroll: Boolean,
    kosm_flaw: Boolean,

    esoterism: Number,
    eso_specs: String,
    eso_reroll: Boolean,
    eso_flaw: Boolean,

    natural: Number,
    nat_specs: String,
    nat_reroll: Boolean,
    nat_flaw: Boolean,
    
//COMPLEXION
    resilience: Number,
    speed: Number,
    initiative: Number,
    momentum: Number,
    size: String,
    size_modifier: Number,
    ambition: String,

//WOUNDS
    wounds: String,

//EXPERIENCE
    exp: Number,
    exp_threshold: Number,
    tokens: Number,

//RELATIONSHIPS & RIVALRIES
    relationships: Array,
    rivalries: Array,

//SOUL & BLOOD
    soul_level: String,
    soul_affliction: String,
    blood_level: String,
    blood_affliction: String,

//FATEFUL EVENTS
    suits_deck: String,
    tarots_deck: String,

//ENCUMBERMENT & INVENTORY
    tier_value: Number,
    carried_weight: Number,
    carried_carrier: Number,
    fst_tier: Boolean,
    snd_tier: Boolean,
    trd_tier: Boolean,
    personal_inventory: String,
    carrier_inventory: String,

//EQUIPMENT
    weapons: Array,

    //Head
    h_skintight: Boolean,
    h_padding: Boolean,
    h_plating: Boolean,
    h_phy: Number,
    h_ele: Number,
    h_tox: Number,
    h_eso: Number,
    h_perks: String,


    //Torso
    t_skintight: Boolean,
    t_padding: Boolean,
    t_plating: Boolean,
    t_phy: Number,
    t_ele: Number,
    t_tox: Number,
    t_eso: Number,
    t_perks: String,

    //leftarm
    larm_skintight: Boolean,
    larm: Boolean,
    larm: Boolean,
    larm_phy: Number,
    larm_ele: Number,
    larm_tox: Number,
    larm_eso: Number,
    larm_perks: String,

    //rightarm
    rarm_skintight: Boolean,
    rarm: Boolean,
    rarm: Boolean,
    rarm_phy: Number,
    rarm_ele: Number,
    rarm_tox: Number,
    rarm_eso: Number,
    rarm_perks: String,

    //leftleg
    lleg_skintight: Boolean,
    lleg: Boolean,
    lleg: Boolean,
    lleg_phy: Number,
    lleg_ele: Number,
    lleg_tox: Number,
    lleg_eso: Number,
    lleg_perks: String,

    //rightleg
    rleg_skintight: Boolean,
    rleg: Boolean,
    rleg: Boolean,
    rleg_phy: Number,
    rleg_ele: Number,
    rleg_tox: Number,
    rleg_eso: Number,
    rleg_perks: String,

    //wings
    w_skintight: Boolean,
    w: Boolean,
    w: Boolean,
    w_phy: Number,
    w_ele: Number,
    w_tox: Number,
    w_eso: Number,
    w_perks: String,

    //tail
    tail_skintight: Boolean,
    tail: Boolean,
    tail: Boolean,
    tail_phy: Number,
    tail_ele: Number,
    tail_tox: Number,
    tail_eso: Number,
    tail_perks: String,

//TALENTS & EVOLUTIONS
    talentsdeck: String,
    evodeck: String,

});

const Character = mongoose.model('Character', CharSchema);
module.exports = Character;