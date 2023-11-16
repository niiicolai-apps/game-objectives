import { ref } from 'vue'

const goals = ref([])

const create = (name, tryComplete=(options={})=>{}, options={}) => {
    if (!name) throw new Error('A goal must have a name')
    if (findByName(name)) throw new Error(`A goal with the name ${name} already exists`)

    const g = {
        name,
        ...options,
        tryComplete
    }
    goals.value.push(g)
    return g
}

const findByName = (name) => {
    return goals.value.find((goal) => goal.name === name)
}

export default {
    goals,
    create,
    findByName
}
