<form class="form" id="searchTable">
    <div class="d-flex align-item-end">
        @if ($master)
            <div class="form-group">
                <label class="form-label">{{ $master_name ?? 'Master' }}</label>
                <select class="form-select" id="searchMaster">
                    <option value="">Select</option>
                    @foreach ($master_data as $master)
                        <option value="{{ $master->id }}">{{ $master->name }}</option>
                    @endforeach
                </select>
            </div>
        @endif
        @if ($column && $column_arr)
            <div class="form-group">
                <label class="form-label">Column</label>
                <select class="form-control" id="searchColumn">
                    <option value="">Select</option>
                    @foreach ($column_arr as $key => $val)
                        <option value="{{ $key }}">{{ $val }}</option>
                    @endforeach
                </select>
            </div>
        @endif
        @if ($keyword)
            <div class="form-group">
                <label class="form-label">Keyword</label>
                <input type="text" class="form-control" placeholder="Keyword" id="searchKeyword">
            </div>
        @endif
        <div class="d-flex align-items-end gap-2 mx-2 ">
            <button type="submit" class="btn btn-info">
                Search
            </button>
            <button type="button" class="btn btn-danger" id="clearSearch">
                Refresh
            </button>
        </div>
    </div>
</form>
