<?php

namespace App\Repositories;

use App\Models\ConnectCustomer;

class ConnectCustomerRepository
{
    protected $model;

    public function __construct(ConnectCustomer $model)
    {
        $this->model = $model;
    }

    public function getAll($params = [])
    {
        $query = $this->model->query();

        // Implement search, sort, paginate logic here if needed

        return $query->get();
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function delete($id)
    {
        return $this->model->destroy($id);
    }
}
