<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ItemRequest;
use App\Http\Resources\Admin\ItemResource;
use App\Models\Item;
use Symfony\Component\HttpKernel\Exception\HttpException;


class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $items = Item::query()
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        return ItemResource::collection($items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ItemRequest $request)
    {
        $item = Item::create($request->validated());

        return ItemResource::make($item);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        return ItemResource::make($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(ItemRequest $request, Item $item)
    {
        $item->update($request->validated());

        return ItemResource::make($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        if (!$item->delete()) {
            throw new HttpException(500, 'Model not deleted!');
        }

        return response(null, 204);
    }
}
