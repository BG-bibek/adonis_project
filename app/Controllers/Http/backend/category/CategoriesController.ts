import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Backend/Category";

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    let categories = await Category.all();
    console.log(categories);
    return view.render("backend/category/index", { categories });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("backend/category/create");
  }

  public async store({ request, response, view }: HttpContextContract) {
    console.log(request.all());
    await Category.create(request.all());
    return view.render("backend/category/index");
  }

  public async edit({ params, view }: HttpContextContract) {
    console.log(params.id);
    let category = await Category.find(params.id);
    return view.render("backend/category/edit", { category });
  }

  public async update({ request, view, params }: HttpContextContract) {
    await Category.query()
      .where("id", params.id)
      .update(request.only(["title", "slug", "icon"]));
    return view.render("backend/category/index");
  }

  public async delete({ view, params }: HttpContextContract) {
    await Category.query().where("id", params.id).delete();
    return view.render("backend/category/index");
  }
}
