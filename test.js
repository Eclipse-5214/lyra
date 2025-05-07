const boxStarredMobs = FeatManager.createFeature("highlightMob", "catacombs");

boxStarredMobs
    .register("lyra:entityJoin", (mcEntity, entityId) => {
        //scheduleTask(() => scanEntityName(mcEntity, entityId, boxStarredMobs), 3);
        Client.scheduleTask(3, () => scanEntityName(mcEntity, entityId, boxStarredMobs));
    })
    .registersub(
        "lyra:renderEntity",
        (entity, _, pticks) => {
            ChatLib.chat(mobs.size());
            //const entityId = entity.entity./* getEntityId */ func_145782_y();
            const data = mobs.get(entityId);
            if (!data) return;
            if (entity.isDead()) return mobs.remove(entityId);
            const [width, height, r, g, b, a] = data;
            //renderBoxFilled([255, 255, 255], entity.getX(), entity.getY(), entity.getZ(), width, height, { chroma: 1, smooth: true });
            RenderHelper.drawEntityBox(entity.getX(), entity.getY(), entity.getZ(), width, height, r, g, b, a, 2, false, true, pticks);
        },
        () => {
            mobs.size();
        }
    )
    .onUnregister(() => {
        mobs.clear();
    });
