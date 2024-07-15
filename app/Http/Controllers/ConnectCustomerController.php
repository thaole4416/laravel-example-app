<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConnectCustomerRequest;
use App\Http\Resources\ConnectCustomerResource;
use App\Services\ConnectCustomerService;
use Illuminate\Http\Request;

class ConnectCustomerController extends Controller
{
    protected $connectCustomerService;

    public function __construct(ConnectCustomerService $connectCustomerService)
    {
        $this->connectCustomerService = $connectCustomerService;
    }

    public function index(Request $request)
    {
        $connectCustomers = $this->connectCustomerService->getConnectCustomers($request);
        return ConnectCustomerResource::collection($connectCustomers);
    }

    public function store(ConnectCustomerRequest $request)
    {
        $data = $request->validated();
        $connectCustomer = $this->connectCustomerService->createConnectCustomer($data);

        return new ConnectCustomerResource($connectCustomer);
    }

    public function destroy($id)
    {
        $this->connectCustomerService->delete($id);

        $this->connectCustomerService->clearCache();

        return response()->json(['message' => 'Connect Customer deleted successfully']);
    }
}
