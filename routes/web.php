<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('app')->group(function () {
    Route::resource('categories', 'FrontEnd\CategoryController');
    Route::resource('meetups', 'FrontEnd\MeetUpController');
    Route::resource('threads', 'FrontEnd\ThreadController');
    Route::resource('users', 'FrontEnd\UserController');
    Route::resource('posts', 'FrontEnd\PostController');
    Route::resource('roles', 'Admin\RoleController');
    Route::post('assign_roles', 'Admin\RoleController@assignRole');
    Route::post('send-token', 'FrontEnd\UserController@sendToken');
    Route::post('validate-token', 'FrontEnd\UserController@validateToken');
    Route::post('reset-password', 'FrontEnd\UserController@resetPassword');
    Route::get('/permission', 'Admin\RoleController@permission');
    Route::get('/isAdmin', 'Admin\RoleController@isAdmin');
    Route::patch('/meetups/{id}/joinMeetup', 'Admin\UserController@joinMeetup');
    Route::patch('/meetups/{id}/leaveMeetup', 'Admin\UserController@leaveMeetup');
    Route::get('/userMeetup', 'Admin\UserController@userMeetup');

    Route::get('/meetup', 'FrontEnd\SearchController@search');
    Route::get('/meetupCategory', 'FrontEnd\SearchController@searchCategory');
});

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '^(?!api\/)[\/\w\.-]*');

Auth::routes();