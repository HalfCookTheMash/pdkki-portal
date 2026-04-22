<?php

namespace App\Filament\Widgets;

use App\Models\Consultant;
use App\Models\DataChange;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 2;

    protected function getStats(): array
    {
        return [
            Stat::make('Konsultan Terdaftar', Consultant::count())
                ->description('Total seluruh konsultan')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),

            Stat::make('Konsultan Aktif', Consultant::where('status', 'active')->count())
                ->description('Konsultan dengan status aktif')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Konsultan Tidak Aktif', Consultant::where('status', 'inactive')->count())
                ->description('Konsultan dengan status tidak aktif')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),

            Stat::make('Perubahan Data', DataChange::where('status', 'pending')->count())
                ->description('Menunggu persetujuan')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('warning'),

            //Stat::make('Aplikasi Perubahan Data', '0')
            //->description('Menunggu persetujuan')
            //->descriptionIcon('heroicon-m-document-text')
            //->color('warning'),
        ];
    }
}
