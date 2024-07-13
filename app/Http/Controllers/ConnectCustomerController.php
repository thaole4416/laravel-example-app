<?php

// app/Http/Controllers/ConnectCustomerController.php

namespace App\Http\Controllers;

use App\Http\Requests\ConnectCustomerRequest;
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
        $connectCustomers = $this->connectCustomerService->getAll($request->all());
        return response()->json($connectCustomers);
    }

    public function store(ConnectCustomerRequest $request)
    {
        $connectCustomer = $this->connectCustomerService->create($request->validated());
        return response()->json($connectCustomer, 201);
    }

    public function destroy($id)
    {
        $this->connectCustomerService->delete($id);
        return response()->json(['message' => 'Record deleted'], 200);
    }
}
