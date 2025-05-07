import Settings from "../Amaterasu/core/Settings";
import DefaultConfig from "../Amaterasu/core/DefaultConfig";

/*  ------------------- Config ------------------

    Core Config

    ------------------- To Do -------------------

    - Nothing :D

    --------------------------------------------- */

//setup

//guis
export const roomName = new Gui();

//config
const defaultConf = new DefaultConfig("lyra", "data/settings.json")

    //general
    .addTextParagraph({
        category: "General",
        configName: "Info",
        title: `&6&l&bLyra`,
        description: "&dMade by NEXD_",
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
        title: "Highlight Starred Mobs",
        description: "Highlight starred mobs in dungeons",
        subcategory: "Dungeons",
    })

    .addDropDown({
        configName: "highlightMobType",
        title: "Highlight Type",
        description: "What type of highlight you want to use",
        category: "General",
        subcategory: "Dungeons",
        options: ["Box", "Outline", "Fill"],
        value: 0,
    })

    .addColorPicker({
        configName: "highlightColor",
        title: "Highlight Color",
        description: "The color to highlight starred mobs",
        category: "General",
        subcategory: "Dungeons",
        value: [0, 255, 255, 255],
    })

    .addSwitch({
        category: "General",
        configName: "mobChroma",
        title: "Chroma",
        description: "Make the highlight color chroma",
        subcategory: "Dungeons",
    });

const config = new Settings("lyra", defaultConf, "data/ColorScheme.json");

export default () => config.settings;
