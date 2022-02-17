const Recommendation = ({ aim, level }) => {
  const aims = ["lose-fat", "gain-strength", "gain-muscles"];
  const levels = ["no-experience", "beginner", "intermediate", "professional"];

  let result;

  if (aim === aims[0]) {
    //  Fat loss

    switch (level) {
      case levels[0]:
        // Program 1
        result = { type: "fat", level: 1, title: "The Ultimate Weight Loss Training Guide", description: "This is the best ultimate weight loss training guide for level training non-experience" };
      case levels[1]:
        // Program 2
        result = { type: "fat", level: 1, title: "The Ultimate Weight Loss Training Guide", description: "This is the best ultimate weight loss training guide for beginners" };
        break;
      case levels[2]:
        result = { type: "fat", level: 2, title: "8 Week Fat Loss Workout Plan", description: "This is the best fat loss workout plan for training level intermediate " };
        break;
      case levels[3]:
        // Program 3
        result = { type: "fat", level: 3, title: "The 8 Week Shred", description: "This is the best fat loss/ shredding workout plan for training level profressional " };
        break;
      default:
        // Program 1
        result = { type: "fat", level: 1, title: "The Ultimate Weight Loss Training Guide", description: "Best workout plan for building stregth" };
        break;
    }
  }

  if (aim === aims[1]) {
    // Gain strength
    //  Fat loss
    switch (level) {
      case levels[0]:
        // Program 1
        result = { type: "strength", level: 1, title: "6 Week Workout Program To Build Muscle stregnth", description: "This is the best strength building workout plan for non-expereince people" };
      case levels[1]:
        // Program 2
        result = { type: "strength", level: 1, title: "6 Week Workout Program To Build Muscle stregnth", description: "This is the best strength building workout plan for beginners" };
        break;
      case levels[2]:
        // Program 3
        result = { type: "strength", level: 2, title: "Full Body Workout A", description: "This is the best strength building workout plan for training level intermediate" };
        break;
      case levels[3]:
        // Program 3
        result = { type: "strength", level: 3, title: "Full Body Workout A", description: "This is the best strength building workout plan for training level professional" };
        break;
      default:
        // Program 1
        result = { type: "strength", level: 1, title: "6 Week Workout Program To Build Muscle stregnth", description: "Best workout plan for building stregth" };
        break;
    }
  }

  if (aim === aims[2]) {
    // Gain muscle
    //  Fat loss
    switch (level) {
      case levels[0]:
        // Program 1
        result = { type: "muscle", level: 1, title: "Full Body Training", description: "This is the best muscle workout plan for non expereince people" };
      case levels[1]:
        // Program 2
        result = { type: "muscle", level: 1, title: "Full Body Training", description: "This is the best muscle workout plan for beginners" };
        break;
      case levels[2]:
        // Program 3
        result = { type: "muscle", level: 2, title: "The Muscle Building Workout Routine", description: "This is the best muscle workout plan for training level intermediate" };
        break;
      case levels[3]:
        // Program 3
        result = { type: "muscle", level: 3, title: "The Muscle Building Workout Routine", description: "This is the best muscle workout plan for training level professional" };
        break;
      default:
        // Program 1
        result = { type: "muscle", level: 1, title: "Full Body Training", description: "Best workout plan for building stregth" };
        break;
    }
  }

  return result;
};

export default Recommendation;
