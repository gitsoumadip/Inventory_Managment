@extends('backend.structure.structure')
@section('event-active', 'active')
@section('title', __('Event'))
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
            <h4>Event</h3>
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
                        Add Event
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
                                        <h4 class="modal-title text-primary" id="formHead">Add Event</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="modal-body bg-secondary">
                                        <div class="row">
                                            <div class="col">
                                                <div class="col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label for="name" class="form-label">Event Name</label>
                                                        <input type="text" name="name" id="name"
                                                            placeholder="Enter Event Name" class="w-100 form-control">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label for="location" class="form-label">Event Location</label>
                                                        <input type="text" name="location" id="location"
                                                            placeholder="Enter Event Location" class="w-100 form-control">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label for="date" class="form-label">Event Date</label>
                                                        <input type="date" name="date" id="date"
                                                            placeholder="select Event Date" class="w-100 form-control">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label for="start_time" class="form-label">Event Start Time</label>
                                                        <input type="time" name="start_time" id="start_time"
                                                            placeholder="select event start time"
                                                            class="w-100 form-control">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label for="end_time" class="form-label">Event End Time</label>
                                                        <input type="time" name="end_time" id="end_time"
                                                            placeholder="select Event End time" class="w-100 form-control">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label for="person_name" class="form-label">Event Person Name</label>
                                                        <input type="text" name="person_name" id="person_name"
                                                            placeholder="Enter Event person Name"
                                                            class="w-100 form-control">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label for="person_ph" class="form-label">Event Person Phone No.</label>
                                                        <input type="number" name="person_ph" id="person_ph"
                                                            placeholder="Enter Event person Phone No."
                                                            class="w-100 form-control">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label for="status" class="form-label">Event Status</label>
                                                        <select name="status" class="w-100 form-select" id="status">
                                                            <option value="">Select</option>
                                                            <option value="1">active</option>
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
    <script src="{{ asset('public/backend/assets/js/pages/event.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
@endpush
