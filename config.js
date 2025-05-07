import Settings from "../../Amaterasu/core/Settings";
import DefaultConfig from "../../Amaterasu/core/DefaultConfig";

/*  ------------------- Config ------------------

    Core Config

    ------------------- To Do -------------------

    - Nothing :D

    --------------------------------------------- */

//setup

//guis
export const roomName = new Gui();

//config
const defaultConf = new DefaultConfig("stella", "data/settings.json")

    //general
    .addTextParagraph({
        category: "General",
        configName: "Info",
        title: `&6&l&dStella`,
        description: "&bMade by NEXD_",
        centered: true,
        subcategory: "",
    })

    .addButton({
        category: "General",
        subcategory: "",
        configName: "MyDiscord",
        title: "Discord Server",
        description: "Join if you want to report a bug or want to make a suggestion",
        tags: ["discord"],
        onClick(setting) {
            ChatLib.command("ct copy coming soon", true);
            ChatLib.chat("&6Copied Discord Link!");
        },
    })

    .addButton({
        category: "General",
        subcategory: "",
        configName: "MyGithub",
        title: "Github",
        description: "The source code for all this :D",
        tags: ["github"],
        onClick(setting) {
            ChatLib.command("ct copy https://github.com/Eclipse-5214/stella", true);
            ChatLib.chat("&6Copied Discord Link!");
        },
    })

    //Highlight mob
    .addSwitch({
        category: "General",
        configName: "highlightMob",
        title: "Highlight Dungeon trash",
        description: "Highlights dungeon trash in your inventory",
        subcategory: "General",
    })

    .addDropDown({
        configName: "termNumber",
        title: "Number",
        description: "What terminal number you want to call",
        category: "Dungeons",
        subcategory: "Terminals",
        options: ["1", "2", "3", "4", "All"],
        value: 4,

        shouldShow(data) {
            return data.termNumbers;
        },
    })

    .addColorPicker({
        configName: "highlightColor",
        title: "Highlight Color",
        description: "The color to highlight trash",
        category: "Dungeons",
        subcategory: "General",
        value: [0, 255, 255, 255],

        shouldShow(data) {
            return data.highlightTrash;
        },
    })

    .addSwitch({
        category: "General",
        configName: "mobChroma",
        title: "Highlight Dungeon trash",
        description: "Highlights dungeon trash in your inventory",
        subcategory: "General",
    });

const config = new Settings("stella", defaultConf, "data/ColorScheme.json");

export default () => config.settings;
