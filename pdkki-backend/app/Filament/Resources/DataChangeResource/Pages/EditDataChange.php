<?php

namespace App\Filament\Resources\DataChangeResource\Pages;

use App\Filament\Resources\DataChangeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDataChange extends EditRecord
{
    protected static string $resource = DataChangeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
