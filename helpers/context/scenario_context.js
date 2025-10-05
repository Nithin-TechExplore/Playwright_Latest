let scenarioContext;

class ScenarioContext{
    getScenarioContext(){
        if(!scenarioContext)
        scenarioContext = new Map();
        return scenarioContext;
    }

    setContext(key,value){
        this.getScenarioContext().set(key,value);
    }

    getContext(key){
        return this.getScenarioContext().get(key);
    }

}

module.exports = new ScenarioContext();