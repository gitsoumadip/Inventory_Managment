@extends('backend.structure.structure')
@section('items-active', 'active')
@section('title', __('Items'))
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
            <h4>Items</h3>
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
                        Add Items
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
                                        <h4 class="modal-title text-primary" id="formHead">Add Items</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <!-- Modal body -->

                                    <div class="modal-body bg-secondary">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group mb-3">
                                                    <label for="products_id" class="form-label">Products</label>
                                                    <select name="products_id" class="w-100 form-select" id="products_id">
                                                        <option value="">Select Productsss</option>
                                                        @foreach ($products as $product)
                                                        <option value="{{ $product->id }}">{{ $product->value }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="category_id" class="form-label">Category</label>
                                                    <select name="category_id" id="category_id" class="w-100 form-select">
                                                        <option value="">Select Category</option>
                                                        @foreach ($categories as $cat)
                                                            <option value="{{ $cat->id }}">{{ $cat->value }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="brand_id" class="form-label">Brand</label>
                                                    <select name="brand_id" id="brand_id" class="w-100 form-select">
                                                        <option value="">Select Brand</option>
                                                        @foreach ($brands as $brand)
                                                        <option value="{{ $brand->id }}">{{ $brand->value }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="store_id" class="form-label">store_loc</label>
                                                    <select name="store_id" id="store_id"  class="w-100 form-select">
                                                        <option value="">Select store_loc</option>
                                                        @foreach ($storeloc as $strloc)
                                                        <option value="{{ $strloc->id }}">{{ $strloc->value }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="models_id" class="form-label">Model No</label>
                                                    <select name="models_id" id="models_id"  class="w-100 form-select">
                                                        <option value="">Select Model No</option>
                                                        @foreach ($modelNumber as $modelNumbers)
                                                        <option value="{{ $modelNumbers->id }}">{{ $modelNumbers->value }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="serial_no" class="form-label">Serial No</label>
                                                    <input type="text" name="serial_no" id="serial_no"
                                                        placeholder="Enter Serial No." class="w-100 form-control">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="price" class="form-label">approx_rate</label>
                                                    <input type="text" name="price" id="price"
                                                        placeholder="Enter Approx Rate" class="w-100 form-control">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="description" class="form-label">Description</label>
                                                    <input type="text" name="description" id="description"  placeholder="Enter Desc"
                                                        class="w-100 form-control">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="status" class="form-label">status</label>
                                                    <select name="status" id="status" class="w-100 form-select">
                                                        <option value="">Select item status</option>
                                                        <option value="0">available</option>
                                                        <option value="1">unavailable</option>
                                                        <option value="2">damage</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Modal footer -->
                                    <div class="modal-footer bg-secondary">
                                        <button type="button" class="btn btn-danger"
                                            data-bs-dismiss="modal">Close</button>
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
    <script src="{{ asset('public/backend/assets/js/pages/items.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
@endpush
