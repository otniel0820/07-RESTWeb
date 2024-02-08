export class UpdateTodoDTO {
  constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;

    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { text,id, completedAt } = props;

    if(!id || isNaN(Number(id))){
        return ['id is not a valid number'];
    
    }

    let newCompletedAt = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toDateString() === "Invalid Date") {
        return ['completedAt is not a valid date'];
      }
    }

    return [undefined, new UpdateTodoDTO(id,text, newCompletedAt)];
  }
}
