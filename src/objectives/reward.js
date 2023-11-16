import { ref } from 'vue'

const rewards = ref([])

const create = (name, onComplete=(options={})=>{}, options={}) => {
    if (!name) throw new Error('A reward must have a name')
    if (findByName(name)) throw new Error(`A reward with the name ${name} already exists`)

    const r = {
        name,
        options,
        onComplete
    }
    rewards.value.push(r)
    return r
}

const findByName = (name) => {
    return rewards.value.find((reward) => reward.name === name)
}

export default {
    rewards,
    create,
    findByName
}
