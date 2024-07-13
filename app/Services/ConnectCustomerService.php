<?php

namespace App\Services;

use App\Repositories\ConnectCustomerRepository;

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

    public function create($data)
    {
        return $this->connectCustomerRepo->create($data);
    }

    public function delete($id)
    {
        return $this->connectCustomerRepo->delete($id);
    }
}
