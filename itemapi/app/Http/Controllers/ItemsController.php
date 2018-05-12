<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Item;
use Illuminate\Support\Facades\Validator;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::all();
        return response()->json( $items );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( Request $request )
    {
        // We are doing the validation in this manner, because of api way of storing data.
    	$validator = Validator::make( $request->all(), [
        	'text' => 'required',
        ] );

        if ( $validator->fails() ) {
        	$response = array( 'response', $validator->messages(), 'success' => false );
        	return $response;
        } else {
        	// Create item
	        $item = new Item;
	        $item->text = $request->input( 'text' );
	        $item->body = $request->input( 'body' );
	        $item->save();

	        return response()->json( $item );
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Item::find( $id );
        return response()->json( $item );
//        return view( '', compact( 'item' ) );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
	    // We are doing the validation in this manner, because of api way of storing data.
	    $validator = Validator::make( $request->all(), [
		    'text' => 'required',
	    ] );

	    if ( $validator->fails() ) {
		    $response = array( 'response', $validator->messages(), 'success' => false );
		    return $response;
	    } else {
		    // Update item
		    $item = Item::find( $id );
		    $item->text = $request->input( 'text' );
		    $item->body = $request->input( 'body' );
		    $item->save();

		    return response()->json( $item );
	    }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
	    $item = Item::find( $id );
	    $item->delete();

	    $response = array( 'response' => 'Item deleted', 'success' => true );
	    return $response;
    }
}
