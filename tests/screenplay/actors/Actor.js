class Actor {
  constructor(name) {
    this.name = name;
    this.abilities = {};
    this.lastResponse = null;
  }

  can(ability) {
    Object.assign(this.abilities, ability);
  }

  async attemptsTo(...tasks) {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  async ask(question) {
    return question.answeredBy(this);
  }
}

module.exports = Actor;