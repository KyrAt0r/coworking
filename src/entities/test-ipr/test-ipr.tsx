interface Bird {
    fly(): void;
}

interface Fish {
    swim(): void;
}

function isBird(pet: Bird | Fish): pet is Bird {
    return (pet as Bird).fly !== undefined;
}

function move(pet: Bird | Fish) {
    if (isBird(pet)) {
        pet.fly();
    } else {
        (pet as Fish).swim();
    }
}

const myBird: Bird = { fly: () => console.log("Flying") };
const myFish: Fish = { swim: () => console.log("Swimming") };

move(myBird);
move(myFish);

