<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['prefix' => 'api'], function () {
   Route::get('/home','NewController@index');
   Route::post('/create-title','NewController@createTitle');
   Route::delete('/delete/{id}','NewController@delete');
   //edit
   Route::get('/edit/{id}','NewController@edit');
   Route::post('/update','NewController@update');
});

Route::any('{all}', function(){
    return view('welcome');
})->where('all', '.*');
