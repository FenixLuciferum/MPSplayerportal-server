const express = require('express');
const router = express.Router();

const character = require('./../models/character');

const cors = require('cors');
const corsOptions = {
  credentials: true,
  origin: ['https://mpsplayerportal-client.vercel.app', 'https://mpsplayerportal-server.vercel.app']
}



//Grabs Char from list
router.get('/getchar', cors(corsOptions), (req, res) => {
    let {ownerID} = req.query; 
    character.find({ownerID})
    .then(data => {
        if (data.length) {
            res.json({
                status: "SUCCESS",
                message: "The following are the found characters",
                data: data
            })
        }
    })
    .catch(err => {
        res.json({
            status: "FAILED",
            message: "Error occurred while checking for characters.",
        })
    });

});

//Grabs only one Character (Seems I can't grab the ID just like that)
/* router.get('/getone', (req, res) => {
    let {stringID} = req.query;
    stringID = stringID.substring(1);
    _id = `ObjectId('${stringID}')`;
    character.find({_id})
    .then(data => {
        if (data.length) {
            res.json({
                status: "SUCCESS",
                message: "Character Data Loaded",
                data: data
            })
        }
    })
    .catch(err => {
        res.json({
            status: "FAILED",
            message: "Error occurred while checking for characters.",
        })
    });

}); */



// Make New Character
router.post('/newchar', cors(corsOptions),  (req,res) => {
    let {ownerID, chaName} = req.body
    if (chaName == "" || chaName == undefined) {
        res.json({
            status: "FAILED", 
            message: "Empty input fields."
        });
    } else {
        const newCharacter = new character({
            ownerID,

            chaName,
            culture: '',
            race: '',
            faith: '',
            breakpoint: '',
            carrer: '',
            features: '',
            languages: '',

            mgt: 1,
            fin: 1,
            ins: 1,
            cha: 1,
            eru: 1,
            wpw: 1,

            mgt_stress: 0,
            fin_stress: 0,
            ins_stress: 0,
            cha_stress: 0,
            eru_stress: 0,
            wpw_stress: 0,

            //Training
            melee_weapons: 0,
            mw_specs: '',
            mw_reroll: false,
            mw_flaw: false,
            
            ranged_weapons: 0,
            rw_specs: '',
            rw_reroll: false,
            rw_flaw: false,

            catalysts: 0,
            cata_specs: '',
            cata_reroll: false,
            cata_flaw: false,

            talents: 0,
            tale_specs: '',
            tale_reroll: false,
            tale_flaw: false,

            brawl: 0,
            brawl_specs: '',
            brawl_reroll: false,
            brawl_flaw: false,

            defence: 0,
            def_specs: '',
            def_reroll: false,
            def_flaw: false,

            //Proficiency
            survival: 0,
            surv_specs: '',
            surv_reroll: false,
            surv_flaw: false,

            exploring: 0,
            ex_specs: '',
            ex_reroll: false,
            ex_flaw: false,

            subterfuge: 0,
            sub_specs: '',
            sub_reroll: false,
            sub_flaw: false,

            persuasion: 0,
            per_specs: '',
            per_reroll: false,
            per_flaw: false,

            art: 0,
            art_specs: '',
            art_reroll: false,
            art_flaw: false,

            medicine: 0,
            med_specs: '',
            med_reroll: false,
            med_flaw: false,

            //Lore
            academics: 0,
            aca_specs: '',
            aca_reroll: false,
            aca_flaw: false,

            urban: 0,
            urb_specs: '',
            urb_reroll: false,
            urb_flaw: false,

            arcane: 0,
            arcane_specs: '',
            arcane_reroll: false,
            arcane_flaw: false,

            kosmology: 0,
            kosm_specs: '',
            kosm_reroll: false,
            kosm_flaw: false,

            esoterism: 0,
            eso_specs: '',
            eso_reroll: false,
            eso_flaw: false,

            natural: 0,
            nat_specs: '',
            nat_reroll: false,
            nat_flaw: false,

            resilience: 2,
            speed: 2,
            initiative: 1,
            momentum: 6,
            size: '',
            size_modifier: 0,
            ambition: '',

            wounds: '',

            exp: 0,
            exp_threshold: 10,
            tokens: 0,

            relationships: [{
                name: 'e.g. Jurgen Ruderth Bjorn',
                para: 'e.g. Military, Individual, Local',
                effects: 'e.g. Authorizes an Arxian bombardment on the area.',
            }],
            rivalries: [{
                name: 'e.g. Kalth Golden Hand',
                para: 'e.g. Divine, Individual, Personal',
                effects: "e.g. Raises the Champion's stress every hour.",
            }],

            soul_level: '',
            soul_affliction: '',
            blood_level: '',
            blood_affliction: '',

            suits_deck: '',
            tarots_deck: '',

            tier_value: 0,
            carried_weight: 0,
            carried_carrier: 0,
            fst_tier: false,
            snd_tier: false,
            trd_tier: false,
            personal_inventory: '',
            carrier_inventory: '',

            weapons: [],

            //Head
            h_skintight: false,
            h_padding: false,
            h_plating: false,
            h_phy: 0,
            h_ele: 0,
            h_tox: 0,
            h_eso: 0,
            h_perks: '',


            //Torso
            t_skintight: false,
            t_padding: false,
            t_plating: false,
            t_phy: 0,
            t_ele: 0,
            t_tox: 0,
            t_eso: 0,
            t_perks: '',

            //leftarm
            larm_skintight: false,
            larm: false,
            larm: false,
            larm_phy: 0,
            larm_ele: 0,
            larm_tox: 0,
            larm_eso: 0,
            larm_perks: '',

            //rightarm
            rarm_skintight: false,
            rarm: false,
            rarm: false,
            rarm_phy: 0,
            rarm_ele: 0,
            rarm_tox: 0,
            rarm_eso: 0,
            rarm_perks: '',

            //leftleg
            lleg_skintight: false,
            lleg: false,
            lleg: false,
            lleg_phy: 0,
            lleg_ele: 0,
            lleg_tox: 0,
            lleg_eso: 0,
            lleg_perks: '',

            //rightleg
            rleg_skintight: false,
            rleg: false,
            rleg: false,
            rleg_phy: 0,
            rleg_ele: 0,
            rleg_tox: 0,
            rleg_eso: 0,
            rleg_perks: '',

            //wings
            w_skintight: false,
            w: false,
            w: false,
            w_phy: 0,
            w_ele: 0,
            w_tox: 0,
            w_eso: 0,
            w_perks: '',

            //tail
            tail_skintight: false,
            tail: false,
            tail: false,
            tail_phy: 0,
            tail_ele: 0,
            tail_tox: 0,
            tail_eso: 0,
            tail_perks: '',

            talentsdeck: '',
            evodeck: '',

        });

        newCharacter.save()
        .then(result => {
            res.json({
                status: "SUCCESS",
                message: "Character Saved!",
                data: result
            });
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while saving character."
            })
        })
    }

});

// Save changes to Character
router.put('/save',  cors(corsOptions), (req,res) => {
    let {data, char} = req.body.params
    

    char = char.substring(1);
    console.log(char);

    character.findByIdAndUpdate(char, data[0])
    
    .then(result => {
        res.json({
            status: "SUCCESS",
            message: "Character Updated!",
            data: result
        });
    })
    .catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occurred while saving character."
        })
    })
    

});

module.exports = router;
