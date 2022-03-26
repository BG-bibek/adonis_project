import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Backend/Product";

export default class ProductsController {
  public async index({ view }: HttpContextContract) {
    let products = await Product.all();
    console.log(products);
    return view.render("backend/product/index", { products });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("backend/product/create");
  }

  public async store({ request, response, view }: HttpContextContract) {
    console.log(request.all());
    await Product.create(request.all());
    return view.render("backend/product/index");
  }

  public async edit({ params, view }: HttpContextContract) {
    console.log(params.id);
    let product = await Product.find(params.id);
    return view.render("backend/product/edit", { product });
  }

  public async update({ request, view, params }: HttpContextContract) {
    await Product.query()
      .where("id", params.id)
      .update(request.only(["title", "slug", "icon"]));
    return view.render("backend/product/index");
  }

  public async delete({ view, params }: HttpContextContract) {
    await Product.query().where("id", params.id).delete();
    return view.render("backend/product/index");
  }
}
