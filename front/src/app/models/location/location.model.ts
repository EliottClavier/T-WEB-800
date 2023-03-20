export class Location {

  private id: string;
  private name: string;

  constructor(id: string = "", name: string = "") {
    this.id = id;
    this.name = name;
  }


  // Getter
  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  // Setter
  set setId(id: string) {
    this.id = id;
  }

  set setName(name: string) {
    this.name = name;
  }

}
