import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Category from "App/Models/Backend/Category";

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    let categroyData = [
      {
        title: "hello",
        slug: "world",
        icon: "eg.jpg",
      },
      {
        title: "hello1",
        slug: "yummy",
        icon: "example.jpg",
      },
      {
        title: "hello2",
        slug: "broken",
        icon: "etc.jpg",
      },
    ];
    for (let i = 0; i < categroyData.length; i++) {
      let CategoryExists = await Category.query()
        .where("slug", categroyData[i].slug)
        .first();
      if (!CategoryExists) {
        await Category.create(categroyData[i]);
      }
    }
  }
}
