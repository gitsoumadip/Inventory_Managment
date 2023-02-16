@extends('backend.structure.structure')
@section('store-active', 'active')
@section('title', __('store house'))
@push('styles')
    <style>
        span {
            color: red;
        }
    </style>
@endpush

@section('main')
    <div class="row bg-secondary rounded p-4 mx-0">

        <div class="col-12">
            <h4>Store House</h3>
                <hr>
                <div class="px-2 d-flex justify-content-between align-items-end">
                    @include('backend.includes.search-form', [
                        'keyword' => true,
                        'column' => false,
                        // 'column_arr' => [
                        //     'sub_module_name' => 'Name',
                        //     // 'controller_name' => 'Controller',
                        //     'code' => 'Code',
                        // ],
                        'master' => false,
                        // 'master_name' => 'Module',
                        // 'master_data' => $modules ?? '',
                    ])
                    {{-- Button to Open the Modal  --}}
                    <button type="button" class="btn btn-primary" id="openModalButton">
                        Add Store House
                    </button>
                </div>
                <div class="bg-secondary rounded p-2 mt-3">
                    <div class="table-responsive">
                        <table class="table" id="moduleTable" style="width: 100%">
                        </table>
                    </div>


                    <!-- Modal Form -->
                    <div class="modal" id="moduleFormModal">
                        <div class="modal-dialog">
                            <form id="moduleModalForm" action="" method="POST">
                                @csrf
                                <input type="hidden" name="_method" value="POST" id="formMethod">
                                <input type="hidden" name="id" id="id">
                                <div class="modal-content bg-secondary">
                                    <!-- Modal Header -->
                                    <div class="modal-header bg-secondary">
                                        <h4 class="modal-title text-primary" id="formHead">Add Store House</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="modal-body bg-secondary">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group mb-3">
                                                    <label for="name" class="form-label">Store Name</label>
                                                    <input type="text" name="name" placeholder="Enter Your Store Name" id="name"
                                                        class="w-100 form-control">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="incharge_name" class="form-label">Store Incharge Name</label>
                                                    <input type="text" name="incharge_name"  id="incharge_name"
                                                        placeholder="Enter store Incharge Name" class="w-100 form-control">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="location" class="form-label">Store location</label>
                                                    <input type="text" name="location" placeholder="Enter store location" id="location"
                                                        class="w-100 form-control">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="phone" class="form-label">Store phone</label>
                                                    <input type="text" name="phone" placeholder="Enter store incharge" id="phone"
                                                        class="w-100 form-control">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="status" class="form-label">Store Status</label>
                                                    <select name="status" class="w-100 form-select" id="status">
                                                        <option value="">Select</option>
                                                        <option value="1" selected>active</option>
                                                        <option value="0">inactive</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <!-- Modal footer -->
                                    <div class="modal-footer bg-secondary">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    </div>

@endsection

@push('scripts')
    <script src="{{ asset('public/backend/assets/js/pages/storeHouse.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
@endpush
