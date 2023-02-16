<!-- Sidebar Start -->
<div class="sidebar pe-4 pb-3">
    <nav class="navbar bg-secondary navbar-dark">
        <a href="index.html" class="navbar-brand mx-4 mb-3">
            <h3 class="text-primary"><i class="fa fa-user-edit me-2"></i>DarkPan</h3>
        </a>
        <div class="d-flex align-items-center ms-4 mb-4">
            <div class="position-relative">
                <img class="rounded-circle" src="{{ asset('public/backend/assets/img/user.jpg') }}" alt=""
                    style="width: 40px; height: 40px;">
                <div
                    class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                </div>
            </div>
            <div class="ms-3">
                <h6 class="mb-0">Jhon Doe</h6>
                <span>Admin</span>
            </div>
        </div>
        <div class="navbar-nav w-100">
            <a href="{{ url('/admin/home') }}" class="nav-item nav-link @yield('home-active')"><i class="fa fa-tachometer-alt me-2"></i>Dashboard</a>
            <a href="{{ url('/admin/appointment') }}" class="nav-item nav-link @yield('appointment-active')"><i class="fa fa-th me-2"></i>Appointment</a>
            <a href="{{ url('/admin/event') }}" class="nav-item nav-link @yield('event-active')"><i class="fa fa-th me-2"></i>Event</a>
            <a href="{{ url('/admin/categories') }}" class="nav-item nav-link @yield('category-active')"><i class="fa fa-keyboard me-2"></i>Category</a>
            <a href="{{ url('/admin/brands') }}" class="nav-item nav-link @yield('brand-active')"><i class="fa fa-th me-2"></i>Brand</a>
            <a href="{{ url('/admin/modelnumber') }}" class="nav-item nav-link @yield('modelnumber-active')"><i class="fa fa-th me-2"></i>Model No</a>
            <a href="{{ url('/admin/product') }}" class="nav-item nav-link @yield('product-active')"><i class="fa fa-th me-2"></i>Product</a>
            <a href="{{ url('/admin/supplier') }}" class="nav-item nav-link @yield('supplier-active')"><i class="fa fa-th me-2"></i>supplier</a>
            <a href="{{ url('/admin/store') }}" class="nav-item nav-link @yield('store-active')"><i class="fa fa-th me-2"></i>Store</a>
            <a href="{{ url('/admin/items') }}" class="nav-item nav-link @yield('items-active')"><i class="fa fa-th me-2"></i>Items</a>
            <a href="{{ url('/admin/stocks') }}" class="nav-item nav-link @yield('stocks-active')"><i class="fa fa-th me-2"></i>Stock</a>
            <a href="{{ url('/admin/issueProduct') }}" class="nav-item nav-link @yield('issueProduct-active')"><i class="fa fa-th me-2"></i>Issue Product</a>
            {{-- <a href="{{ url('/admin/issueProductList') }}" class="nav-item nav-link @yield('issueProductList-active')"><i class="fa fa-th me-2"></i>Issue Product List</a> --}}
            <a href="{{ url('/admin/returnProduct') }}" class="nav-item nav-link @yield('returnProduct-active')"><i class="fa fa-th me-2"></i>Return Product</a>

        </div>
    </nav>
</div>
<!-- Sidebar End -->
