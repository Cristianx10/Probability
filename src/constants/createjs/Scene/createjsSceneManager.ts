import createjsConfig from '../createjsConfig';

import CJSScene from './createjsScene';

class CJSSceneManager {

    stage: createjsConfig;
    scenes: CJSScene[] = [];

    constructor(stage: createjsConfig) {
        this.stage = stage;
    }

    updateSceneActive() {
        this.stage.removeAllChildren()
        this.scenes.forEach((s) => {
            console.log("Mi escena esta> ", s.active)
            if (s.active) {
                this.stage.addChild(s);
            }
        })
        this.update();
    }

    addScene(scene: CJSScene, active?: boolean) {
        scene.sceneManager = this;
        scene.active = true;
        if (active != null) { scene.active = active }
        this.stage.addChild(scene);
        this.scenes.push(scene);
        return scene;
    }

    removeScene(scene: CJSScene) {
        var index = this.scenes.indexOf(scene);
        scene.sceneManager = undefined;
        scene.active = false;
        if (index != -1) {
            this.stage.removeChild(scene);
            this.scenes.splice(index, 1);
        }
    }

    removeAllScene() {
        this.scenes.forEach((scene) => {
            scene.active = false;
            scene.sceneManager = undefined;
        });
        this.stage.removeAllChildren();
        this.scenes = [];
    }

    update() { this.stage.update() }

    getStage() {
        return this.stage;
    }

    getBounds() {
        return this.stage.getBounds()
    }

}

export default CJSSceneManager;