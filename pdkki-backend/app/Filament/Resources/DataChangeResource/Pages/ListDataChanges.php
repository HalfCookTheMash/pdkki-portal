<?php

namespace App\Filament\Resources\DataChangeResource\Pages;

use App\Filament\Resources\DataChangeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDataChanges extends ListRecords
{
    protected static string $resource = DataChangeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
