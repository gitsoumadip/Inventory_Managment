@extends('backend.structure.structure')
@section('issueProduct-active', 'active')
@section('title', __('issue Product'))
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
            <h4>issue Product</h3>
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
                        Add issue Product
                    </button>
                </div>
                <div class="bg-secondary rounded p-2 mt-3">
                    <div class="table-responsive">
                        <table class="table" id="moduleTable" style="width: 100%">
                        </table>
                    </div>


                    <!-- Modal Form -->
                    <div class="modal" id="moduleFormModal">
                        <div class="modal-dialog modal-fullscreen">
                            <form id="moduleModalForm" action="" method="POST">
                                @csrf
                                <input type="hidden" name="_method" value="POST" id="formMethod">
                                <input type="hidden" name="id" id="id">
                                <div class="modal-content bg-secondary">
                                    <!-- Modal Header -->
                                    <div class="modal-header bg-secondary">
                                        <h4 class="modal-title text-primary" id="">Product Issue</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="modal-body bg-secondary">
                                        <div class="row">
                                            <div class="col-md-7">
                                                <div class="form-group mb-1 col-md-4">
                                                    <label for="event_number" class="form-label "> Event Number</label>
                                                    <select name="event_number" class="w-100 form-select" id="event_number">
                                                        <option value="">Select</option>
                                                        @foreach ($eventNumber as $envNumber)
                                                        <option value="{{ $envNumber->id }}">{{ $envNumber->value }}</option>
                                                    @endforeach
                                                    </select>
                                                </div>
                                                {{-- </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group mb-1 col-md-8">
                                                            <label for="name" class="form-label ">Store Name</label>
                                                            <select name="status" class="w-100 form-select" id="status">
                                                                <option value="">Select</option>
                                                                <option value="1" selected>active</option>
                                                                <option value="0">inactive</option>
                                                            </select> --}}
                                                {{-- </div> --}}

                                                {{-- <div class="form-group">
                                                            <p>event number</p>
                                                            <p>event name</p>
                                                            <p>event person</p>

                                                            <p>event date</p>
                                                            <p>event contact number</p>
                                                            <p>event location</p>
                                                        </div> --}}
                                                {{-- <div class="col-md-3">
                                                            buby
                                                        </div> --}}

                                            </div>
                                            <div class="col-md-5 ">
                                                <h3>Product Recived Person Details</h3>
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Name</label>
                                                    <input type="text" name="person_name"
                                                        placeholder="Enter Reciver Name" id="person_name"
                                                        class="w-100 form-control">
                                                </div>
                                                <div class="form-group ">
                                                    <label for="name" class="form-label">Phone Number</label>
                                                    <input type="text" name="person_phone"
                                                        placeholder="Enter Phone Number" id="person_phone"
                                                        class="w-100 form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Date</label>
                                                    <input type="Date" name="person_date" placeholder="Enter Date"
                                                        id="person_date" class="w-100 form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Location</label>
                                                    <input type="text" name="person_location"
                                                        placeholder="Enter Reciver Location" id="person_location"
                                                        class="w-100 form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <table>
                                                    <thead>
                                                        {{-- <th>Category</th>
                                                        <th>Brand</th>
                                                        <th>Model No</th> --}}
                                                        <th>Product</th>
                                                        <th>Serial No</th>
                                                        <th>Store House</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Total</th>
                                                    </thead>
                                                    <tbody>

                                                        {{-- <td>
                                                            <div class="form-group m-1">
                                                                <select name="category" class="w-100 form-select"
                                                                    id="category">
                                                                    <option value="">Select category</option>
                                                                    <option value="1" selected>active</option>
                                                                    <option value="0">inactive</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <select name="brand" class="w-100 form-select"
                                                                    id="brand">
                                                                    <option value="">Select Brand</option>
                                                                    <option value="1" selected>active</option>
                                                                    <option value="0">inactive</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <select name="model_no" class="w-100 form-select"
                                                                    id="model_no">
                                                                    <option value="">Select Model no</option>
                                                                    <option value="1" selected>active</option>
                                                                    <option value="0">inactive</option>
                                                                </select>
                                                            </div>
                                                        </td> --}}
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <select name="product" class="w-100 form-select"
                                                                    id="product">
                                                                    <option value="">Select Product</option>
                                                                    @foreach($product as  $item)
                                                                    <option value="{{$item->id}}">{{$item->values}}</option>
                                                                    @endforeach
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <select name="serial_no" class="w-100 form-select"
                                                                    id="serial_no">
                                                                    <option value="">Select Serial No</option>
                                                                    <option value="1" selected>active</option>
                                                                    <option value="0">inactive</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <select name="store_house" class="w-100 form-select"
                                                                    id="store_house">
                                                                    <option value="">Select Store House</option>
                                                                    <option value="1" selected>active</option>
                                                                    <option value="0">inactive</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <input type="text" name="product_price"
                                                                    id="product_price"
                                                                    placeholder="Enter store Incharge Name"
                                                                    class="w-100 form-control">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <input type="text" name="product_qty" id="product_qty"
                                                                    placeholder="Enter store Incharge Name"
                                                                    class="w-100 form-control">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group m-1">
                                                                <input type="text" name="product_total_price"
                                                                    id="product_total_price" placeholder="Total Price"
                                                                    readonly class="w-100 form-control">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="modal-footer bg-secondary">
                                                                <button type="" class="btn btn-primary">+</button>
                                                            </div>
                                                        </td>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Sub Total</label>
                                                    <input type="text" name="sub_total" readonly
                                                        placeholder="Sub Total Price" id="sub_total"
                                                        class="w-100 form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="name" class="form-label">% Tax Rate</label>
                                                    <input type="text" name="tax_rate"
                                                        placeholder="Enter Tax  or default 18%" id="tax_rate"
                                                        class="w-100 form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Tax Amount</label>
                                                    <input type="text" name="tax_amount" placeholder="Tax Rate Amount"
                                                        id="tax_amount" readonly class="w-100 form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Total Amount</label>
                                                    <input type="text" name="total_amount" placeholder="Total Amount"
                                                        id="total_amount" readonly class="w-100 form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Amount Paid</label>
                                                    <input type="text" name="total_amount_paid"
                                                        placeholder="Enter How Many Amount Paid" id="total_amount_paid"
                                                        class="w-100 form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Amount Due</label>
                                                    <input type="text" name="due_amount" readonly
                                                        placeholder="Amount Due" id="due_amount"
                                                        class="w-100 form-control">
                                                </div>
                                            </div>

                                        </div>
                                        {{-- end row --}}
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="name" class="form-label">Notes</label>
                                                    <textarea name="notes" placeholder="Total Amount" id="notes" class="form-control"
                                                        rows="5"></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {{-- </div> --}}
                                    {{-- </div> --}}
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
    <script src="{{ asset('public/backend/assets/js/pages/issueProduct.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
@endpush
