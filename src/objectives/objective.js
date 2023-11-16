import { ref } from 'vue'

const objectives = ref([])

const findByName = (name) => {
    return objectives.value.find((objective) => objective.name === name)
}

const create = (name, description, goals=[], rewards=[]) => {
    if (!name) throw new Error('An objective must have a name')
    if (!description) throw new Error('An objective must have a description')
    if (goals.length === 0) throw new Error('An objective must have at least one goal')
    if (rewards.length === 0) throw new Error('An objective must have at least one reward')
    if (findByName(name)) throw new Error(`An objective with the name ${name} already exists`)

    const o = {
        name,
        description,
        goals,
        rewards
    }
    objectives.value.push(o)
    return o
}

export default {
    objectives,
    create,
    findByName
}
