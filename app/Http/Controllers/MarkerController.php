<?php

namespace App\Http\Controllers;

use App\Http\Resources\MarkerResource;
use App\Models\Marker;
use App\Models\Map;
use Illuminate\Http\Request;
use App\Http\Requests\MarkerRequest;
use App\Repositories\Interfaces\MarkerRepository;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use \Exception;

class MarkerController extends ApiController
{
    protected MarkerRepository $repository;

    public function __construct(MarkerRepository $repository, Request $request)
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Marker  $marker
     * @return \Illuminate\Http\Response
     */
    public function show(Marker $marker)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  MarkerRequest  $request
     * @param  \App\Models\Marker  $marker
     * @return JsonResponse
     */
    public function update(MarkerRequest $request, Map $map, Marker $marker) : JsonResponse
    {
        try {
            $this->repository->update($request, $map, $marker);

            $resource = new MarkerResource($marker);
            $this->apiResponse->setData($resource->toArray($request));
        } catch (Exception $e) {
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_NOT_ACCEPTABLE);
        }

        return $this->successResponse($this->apiResponse);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Marker  $marker
     * @return \Illuminate\Http\Response
     */
    public function destroy(Marker $marker)
    {
        //
    }
}
