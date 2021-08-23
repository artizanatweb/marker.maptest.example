<?php

namespace App\Http\Controllers;

use App\Models\Map;
use Illuminate\Http\Request;
use \Exception;
use App\Repositories\Interfaces\MapRepository;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\MapRequest;
use App\Http\Resources\MapResource;

class MapController extends ApiController
{
    protected MapRepository $repository;

    public function __construct(MapRepository $repository, Request $request)
    {
        parent::__construct($request);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  MapRequest  $request
     * @return JsonResponse
     */
    public function store(MapRequest $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $map = $this->repository->create($request);
            $this->apiResponse->setMessage("New map created!");

            $resource = new MapResource($map);
            $this->apiResponse->setData($resource->toArray($this->apiRequest));
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_NOT_ACCEPTABLE);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Map  $map
     * @return \Illuminate\Http\Response
     */
    public function show(Map $map)
    {
        return new MapResource($map);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  MapRequest  $request
     * @param  \App\Models\Map  $map
     * @return \Illuminate\Http\Response
     */
    public function update(MapRequest $request, Map $map)
    {
        DB::beginTransaction();
        try {
            $this->repository->update($request, $map);
            $this->apiResponse->setMessage("Map successfully updated!");

            $resource = new MapResource($map);
            $this->apiResponse->setData($resource->toArray($this->apiRequest));
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_NOT_ACCEPTABLE);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Map  $map
     * @return \Illuminate\Http\Response
     */
    public function destroy(Map $map)
    {
        //
    }
}
