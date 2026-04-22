<?php

namespace App\Filament\Resources\ConsultantResource\Pages;

use App\Filament\Resources\ConsultantResource;
use Filament\Resources\Pages\ViewRecord;

class ViewConsultant extends ViewRecord
{
    protected static string $resource = ConsultantResource::class;

    public function getRelationManagers(): array
    {
        return [
            ConsultantResource\RelationManagers\EducationRelationManager::class,
            ConsultantResource\RelationManagers\AchievementsRelationManager::class,
            ConsultantResource\RelationManagers\ViolationsRelationManager::class,
        ];
    }
}
