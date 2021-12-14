import createID from "../lib/createID";

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem("tagList") || "[]");
    return this.data;
  },
  create(name) {
    const names = this.data.map((t) => t.name);
    if (names.indexOf(name) >= 0) {
      return "duplicated";
    } else {
      const id = createID().toString();
      this.data.push({ id: id, name: name });
      this.save();
      return "success";
    }
  },
  update(id, name) {
    const idList = this.data.map((t) => t.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map((t) => t.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.data.filter((t) => t.id === id)[0];
        tag.name = name;
        this.save();
        return "success";
      }
    } else {
      return "not found";
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
  save() {
    window.localStorage.setItem("tagList", JSON.stringify(this.data));
  },
};
export default tagListModel;
