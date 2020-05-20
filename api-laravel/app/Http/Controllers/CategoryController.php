<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
 /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  */
 public function index()
 {
  $categories = Category::paginate(10);

  return response()->json($categories);
 }

 /**
  * Store a newly created resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @return \Illuminate\Http\Response
  */
 public function store(Request $request)
 {
  $request->validate([
   'name' => 'required|unique:categories|max:255',
  ]);

  $category       = new Category();
  $category->name = $request->name;
  $category->save();

  return response()->json($category);
 }

 /**
  * Display the specified resource.
  *
  * @return \Illuminate\Http\Response
  */
 public function show($id)
 {
  $category = Category::findOrFail($id);

  return response()->json($category);
 }

 /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @return \Illuminate\Http\Response
  */
 public function update(Request $request, $id)
 {
  $request->validate([
   'name' => 'required|max:255',
  ]);

  $category       = Category::findOrFail($id);
  $category->name = $request->name;
  $category->update();

  return response()->json($category);

 }

 /**
  * Remove the specified resource from storage.
  *
  * @return \Illuminate\Http\Response
  */
 public function destroy($id)
 {
  $category = Category::findOrFail($id);
  $category->delete();

  return response()->json($category);
 }
}
