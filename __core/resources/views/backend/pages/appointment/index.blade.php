@extends('backend.structure.structure')
@section('appointment-active', 'active')
@section('title', __('Appointment'))
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
            <h4>Appointment</h3>
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
                        Add Appointment
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
                                        <h4 class="modal-title text-primary" id="formHead">Add Appointment</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="modal-body bg-secondary">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Person  Name</label>
                                                    <input type="text" class="form-control" name="name"
                                                        placeholder="Enter Person Name" class="w-100" id="name">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Person Phone</label>
                                                    <input type="text" class="form-control" name="phone"
                                                        placeholder="Enter Person Phone" class="w-100" id="phone">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Email</label>
                                                    <input type="text" class="form-control" name="email"
                                                        placeholder="Enter Person Email Id" class="w-100" id="email">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Requirement</label>
                                                    <input type="text" class="form-control" name="requirement"
                                                        placeholder="Enter Requirement" class="w-100" id="requirement">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Date Of Program</label>
                                                    <input type="date" class="form-control" name="dateOfProgram"
                                                        placeholder="Enter Date Of Program" class="w-100"
                                                        id="dateOfProgram">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Discussion Details</label>
                                                    <textarea class="form-control" name="discussion_details" placeholder="Enter discussion_details" class="w-100"
                                                        id="discussion_details"></textarea>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Reference</label>
                                                    <input type="text" class="form-control" name="reference"
                                                        placeholder="Enter Reference" class="w-100" id="reference">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="" class="form-label">Appointment
                                                        Status</label>
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
    <script src="{{ asset('public/backend/assets/js/pages/appointment.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
@endpush
