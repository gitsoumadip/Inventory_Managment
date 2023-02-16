<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>@yield('title')</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description">
    <meta content="{{ csrf_token() }}" name="_token">

    <!-- Favicon -->
    <link href="{{ asset('public/backend/assets/img/favicon.ico') }}" rel="icon" />

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@500;700&display=swap"
        rel="stylesheet" />

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />

    <!-- Libraries Stylesheet -->
    <link href="{{ asset('public/backend/assets/lib/owlcarousel/assets/owl.carousel.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('public/backend/assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css') }}"
        rel="stylesheet" />

    <!-- Customized Bootstrap Stylesheet -->
    <link href="{{ asset('public/backend/assets/css/bootstrap.min.css') }}" rel="stylesheet" />

    <!-- Template Stylesheet -->
    <link href="{{ asset('public/backend/assets/css/style.css') }}" rel="stylesheet" />
    <link href="{{ asset('public/backend/assets/css/sweet-alert-dark.css') }}" rel="stylesheet" />

    <script src="{{ asset('public/backend/assets/js/jquery.js?v=' . config('custom.CACHE_VERSION')) }}"></script>

    <script>
        const SITE_URL = "{{ url('/') }}";
        const MODULE_CONTROLLER = "{{ $moduleController }}";
        const CSRF_TOKEN = "{{ csrf_token() }}";
        $(function() {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-Token': $('meta[name="_token"]').attr('content')
                }
            });
        });
    </script>
    <style>
        .form-label{
            display: block;
            text-align: start !important
        }
        .swal2-popup,
        .swal2-modal {
            border: 2px solid;
        }

        #moduleTable {
            border: 2px solid;
        }

        #moduleTable th,
        #moduleTable td {
            text-align: start;
        }

        #moduleTable_length {
            display: flex;
            padding-bottom: 10px;
        }
        #moduleTable_info{
            float: left;
        }
        #moduleTable_paginate{
            float: right;
        }
        #moduleTable_paginate .paginate_button {
            border: 1px solid rgba(113, 113, 113, 0.337);
            border-radius: 6px;
            margin: 0 5px;
            padding: 0px 4px
        }

        @keyframes popup {
            from {
                transform: scale(0);
            }

            to {
                transform: scale(1);
            }
        }

        .modal-dialog {
            animation: popup 0.5s forwards ease-in-out;
        }

        .dataTables_processing {
        display: inline-block;
        position: absolute;
        width: 80px;
        height: 80px;
        left: 50%;
        }
        .dataTables_processing div {
        animation: dataTables_processing 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
        }
        .dataTables_processing div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #fff;
        margin: -4px 0 0 -4px;
        }
        .dataTables_processing div:nth-child(1) {
        animation-delay: -0.036s;
        }
        .dataTables_processing div:nth-child(1):after {
        top: 63px;
        left: 63px;
        }
        .dataTables_processing div:nth-child(2) {
        animation-delay: -0.072s;
        }
        .dataTables_processing div:nth-child(2):after {
        top: 68px;
        left: 56px;
        }
        .dataTables_processing div:nth-child(3) {
        animation-delay: -0.108s;
        }
        .dataTables_processing div:nth-child(3):after {
        top: 71px;
        left: 48px;
        }
        .dataTables_processing div:nth-child(4) {
        animation-delay: -0.144s;
        }
        .dataTables_processing div:nth-child(4):after {
        top: 72px;
        left: 40px;
        }
        .dataTables_processing div:nth-child(5) {
        animation-delay: -0.18s;
        }
        .dataTables_processing div:nth-child(5):after {
        top: 71px;
        left: 32px;
        }
        .dataTables_processing div:nth-child(6) {
        animation-delay: -0.216s;
        }
        .dataTables_processing div:nth-child(6):after {
        top: 68px;
        left: 24px;
        }
        .dataTables_processing div:nth-child(7) {
        animation-delay: -0.252s;
        }
        .dataTables_processing div:nth-child(7):after {
        top: 63px;
        left: 17px;
        }
        .dataTables_processing div:nth-child(8) {
        animation-delay: -0.288s;
        }
        .dataTables_processing div:nth-child(8):after {
        top: 56px;
        left: 12px;
        }
        @keyframes dataTables_processing {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        }

    </style>
    @stack('styles')
</head>

<body>
    <div class="container-fluid position-relative d-flex p-0">
        <!-- Spinner Start -->
        <div id="spinner"
            class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->
        <x-SideBar />
        <!-- Content Start -->
        <div class="content">
            <x-NavBar />
            <!-- Blank Start -->
            <div class="container-fluid pt-4 px-4">
                @yield('main')
            </div>
            <!-- Blank End -->
            {{-- <x-Footer /> --}}
        </div>
        <!-- Content End -->
        <!-- Back to Top -->
        <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </div>

    <!-- JavaScript Libraries -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('public/backend/assets/lib/chart/chart.min.js') }}"></script>
    <script src="{{ asset('public/backend/assets/lib/easing/easing.min.js') }}"></script>
    <script src="{{ asset('public/backend/assets/lib/waypoints/waypoints.min.js') }}"></script>
    <script src="{{ asset('public/backend/assets/lib/owlcarousel/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('public/backend/assets/lib/tempusdominus/js/moment.min.js') }}"></script>
    <script src="{{ asset('public/backend/assets/lib/tempusdominus/js/moment-timezone.min.js') }}"></script>
    <script src="{{ asset('public/backend/assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js') }}"></script>


    <!-- Template Javascript -->
    <script src="{{ asset('public/backend/assets/js/main.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
    <script src="{{ asset('public/backend/assets/js/jquery.validate.min.js?v=' . config('custom.CACHE_VERSION')) }}">
    </script>
    <script src="{{ asset('public/backend/assets/js/validation-rules.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
    <script src="{{ asset('public/backend/assets/js/sweet-alert.min.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
    <script src="{{ asset('public/backend/assets/js/jquery.dataTables.min.js?v=' . config('custom.CACHE_VERSION')) }}">
    </script>
    <script src="{{ asset('public/backend/assets/js/common.js?v=' . config('custom.CACHE_VERSION')) }}"></script>
    @stack('scripts')
</body>

</html>
