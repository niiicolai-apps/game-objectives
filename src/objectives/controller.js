import { ref } from 'vue'

const create = (options={}) => {
    const objectives = ref([])

    const findAll = () => {
        return objectives.value
    }

    const findCompleted = () => {
        return objectives.value.filter((objective) => objective.completed)
    }

    const findIncomplete = () => {
        return objectives.value.filter((objective) => !objective.completed)
    }

    const findByName = (name) => {
        return objectives.value.find((objective) => objective.name === name)
    }
    
    const add = (objective, completed=false) => {
        if (!objective) throw new Error('An objective must be provided')
        if (findByName(objective.name)) throw new Error(`An objective with the name ${objective.name} already exists`)

        const goals = objective.goals.map((goal) => {
            return {
                ...goal,
                completed
            }
        })


        objectives.value.push({
            name: objective.name,
            description: objective.description,
            rewards: objective.rewards,
            goals,
            completed
        })
    }

    const remove = (objective) => {
        objectives.value.splice(objectives.value.indexOf(objective), 1)
    }

    const tryComplete = (objective) => {
        objective = findByName(objective.name)
        if (objective.completed) return false

        let allGoalsCompleted = true
        objective.goals.forEach((goal) => {
            if (goal.completed) return
            if (!goal.tryComplete(options)) 
                allGoalsCompleted = false
            else
                goal.completed = true
        })
        if (allGoalsCompleted) {
            objective.completed = true
            objective.rewards.forEach((reward) => {
                reward.onComplete(options)
            })
            
            return true
        } else {
            return false
        }
    }

    const tryCompleteByName = (name) => {
        const objective = findByName(name)
        if (!objective) throw new Error(`No objective with the name ${name} exists`)
        return tryComplete(objective)
    }

    const tryCompleteIncompletes = () => {
        const incomplete = findIncomplete()
        if (incomplete.length === 0) return
        for (const objective of incomplete) {
            tryComplete(objective)
        }
    }

    return {
        objectives,
        findAll,
        findCompleted,
        findIncomplete,
        findByName,
        add,
        remove,
        tryComplete,
        tryCompleteByName,
        tryCompleteIncompletes
    }
}

export default {
    create
}