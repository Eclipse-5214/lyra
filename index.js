//https://i.imgur.com/C9iH7yb.png

//import { scheduleTask } from "../tska/shared/ServerTick";
import { renderBoxOutline, createManualOutliner } from "../Apelles/index.js";
import settings from "./config.js";
import { FeatManager } from "./helpers";

const outliner = createManualOutliner([255, 255, 255, 255], 6, { chroma: true });
outliner.register();

const mobs = new HashMap();

const boxStarredMobs = FeatManager.createFeature("highlightMob", "catacombs");

const scanEntityName = (mcEntity, entityId) => {
    const name = mcEntity./* getName */ func_70005_c_();
    if (!name.includes("✯ ")) return;

    const entityBelowId = entityId - (name.includes("Withermancer") ? 3 : 1);
    const entityBelow = World.getWorld()./* getEntityByID */ func_73045_a(entityBelowId);
    if (!entityBelow) return;
    if (entityBelow instanceof net.minecraft.entity.monster.EntityEnderman) {
        mobs.put(entityBelowId, [/* width */ 0.6, /* height */ 0.7, /* red */ 255, /* green */ 51, /* blue */ 255, /* alpha */ 255]);
        boxStarredMobs.update();
        return;
    }

    mobs.put(entityBelowId, [
        /* width */ entityBelow./* width */ field_70130_N,
        /* height */ entityBelow./* height */ field_70131_O + 0.2, // "magic number" - an attempt to try to make the hitbox go over the armor the entity is wearing
        /* red */ 0,
        /* green */ 255,
        /* blue */ 255,
        /* alpha */ 255,
    ]);
    boxStarredMobs.update();
};

boxStarredMobs
    .register("lyra:entityJoin", (mcEntity, entityId) => {
        //scheduleTask(() => scanEntityName(mcEntity, entityId, boxStarredMobs), 3);
        Client.scheduleTask(3, () => scanEntityName(mcEntity, entityId, boxStarredMobs));
    })
    .registersub(
        "lyra:renderEntity",
        (entity, _, pticks) => {
            const entityId = entity.entity./* getEntityId */ func_145782_y();
            const data = mobs.get(entityId);
            if (!data) return;
            if (entity.isDead()) return mobs.remove(entityId);

            const [width, height, r, g, b, a] = data;
            if (settings().mobChroma) [r, g, b, a] = [255, 255, 255, 255];

            //renderBoxOutline([r, g, b, a], entity.getX(), entity.getY(), entity.getZ(), width, height, { smooth: true });
        },
        () => {
            return mobs.size() != 0 ? true : false;
        }
    )
    .onUnregister(() => {
        mobs.clear();
    });

register("command", () => World.getAllEntities().forEach((v) => outliner.add(v.entity))).setName("outlineall");

register("command", (...args) => {
    if (args[0] === "help") {
        ChatLib.chat("&8&m-------------------------------------------------");
        ChatLib.chat("&6/lyra &7main command! Aliases: &6/ly /lyr");
        ChatLib.chat("&6/ly help &7Opens the Lyra help menu!");
        ChatLib.chat("&8&m-------------------------------------------------");
    } else if (!args || !args.length || !args[0]) {
        return settings().getConfig().openGui();
    } else {
        ChatLib.chat("&cUnknown command. &7Try &6/ly help &7for a list of commands");
    }
})
    .setName("lyra")
    .setAliases("ly", "lyr");
