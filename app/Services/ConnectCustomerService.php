<?php

namespace App\Services;

use App\Models\ConnectCustomer;
use App\Repositories\ConnectCustomerRepository;
use Illuminate\Http\Request;

class ConnectCustomerService
{
    protected $connectCustomerRepo;

    public function __construct(ConnectCustomerRepository $connectCustomerRepo)
    {
        $this->connectCustomerRepo = $connectCustomerRepo;
    }

    public function getAll($params = [])
    {
        return $this->connectCustomerRepo->getAll($params);
    }

    public function getConnectCustomers(Request $request)
    {
        $query = ConnectCustomer::query()->with('affiliate');

        if ($search = $request->input('search')) {
            $query->where('customer_name', 'LIKE', "%{$search}%")
                ->orWhereHas('affiliate', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%");
                });
        }

        if ($sort = $request->input('sort')) {
            $query->orderBy($sort, $request->input('direction', 'asc'));
        }

        $limit = $request->input('limit', 10);
        return $query->paginate($limit);
    }

    public function create($data)
    {
        return $this->connectCustomerRepo->create($data);
    }

    public function delete($id)
    {
        return $this->connectCustomerRepo->delete($id);
    }
}
