<?php

namespace App\Filament\Resources\ConsultantResource\Pages;

use App\Filament\Resources\ConsultantResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditConsultant extends EditRecord
{
    protected static string $resource = ConsultantResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    
    public function getRelationManagers(): array
    {
        return [
            ConsultantResource\RelationManagers\EducationRelationManager::class,
            ConsultantResource\RelationManagers\AchievementsRelationManager::class,
            ConsultantResource\RelationManagers\ViolationsRelationManager::class,
        ];
    }
}
