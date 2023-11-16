# Install

```bash
$ npm install
```

# Release
1. Ensure 7zip is installed (https://www.7-zip.org/download.html)
2. Set system env. variable: 
```bash
export PATH=$PATH:/c/Program\ Files/7-Zip
```
3. Run the release script:
```bash
$ bash release.sh
```
4. Create and publish a new release on https://github.com/niiicolai-apps/game-objectives/releases/new (Remember to include the zip created in step 3)

# Usage in development

```bash
$ npm run dev
```

# Usage in other projects

## Install in other projects
Remember to replace `#1.0.0` with the needed version.
```bash
npm install --save niiicolai-apps/game-objectives#1.0.0
```

## Update in other projects
```bash
npm update niiicolai-apps/game-objectives
```

## How to

```vue
<script setup>
import GameObjective from '../index.js';
import { ref, computed } from 'vue';

// 1. create a goal
const goal = GameObjective.Goal.create('Move to origo', (options) => {
  // Note: options is the player.
  return (
    options.value.position.x === 0
    && options.value.position.y === 0
    && options.value.position.z === 0
  )
})

// 2. create a reward
const reward = GameObjective.Reward.create('100 Experience', (options) => {
  // Note: options is the player.
  options.value.experience += 100;
  console.log('Player got 100 experience');
  console.log('Player experience is now: ' + options.value.experience);
})

// 3. create an objective using the goal and reward
const objective = GameObjective.Objective.create(
  'Move to origo',
  'Find origo and get 100 experience',
  [goal],
  [reward]
);

// 4. create player and objectives controller
const player = ref({ position: { x: 0, y: 0, z: 0 }, experience: 0 });
const playerObjectiveCtrl = GameObjective.Controller.create(player);
const objectives = computed(() => playerObjectiveCtrl.objectives.value);

// 5. add objective to player's objective-controller
playerObjectiveCtrl.add(objective);
</script>

<template>
  <div id="app">
    <h1>Player Objectives</h1>
    <h2>
      <span>Player experience: {{ player.experience }}</span>
    </h2>
    <button @click="playerObjectiveCtrl.tryCompleteIncompletes()">
      Try complete objectives
    </button>
    <ul>
      <li v-for="objective in objectives" :key="objective.name">
        <h2>{{ objective.name }} ({{ objective.completed ? 'Completed' : 'Not completed' }})</h2>
        <p>{{ objective.description }}</p>
        <ul>
          <li v-for="goal in objective.goals" :key="goal.name">
            <p>
              {{ goal.name }}: {{ goal.completed ? 'Completed' : 'Not completed' }}
            </p>
          </li>
        </ul>
        <ul>
          <li v-for="reward in objective.rewards" :key="reward.name">
            <p>{{ reward.name }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
```