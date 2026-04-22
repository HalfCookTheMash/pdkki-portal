<?php

namespace App\Filament\Resources\ConsultantResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AchievementsRelationManager extends RelationManager
{
    protected static string $relationship = 'achievements';
    protected static ?string $title = 'Prestasi';

    public function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')
                ->label('Nama Prestasi')
                ->required(),
            TextInput::make('organizer')
                ->label('Penyelenggara'),
            DatePicker::make('date')
                ->label('Tanggal'),
            Textarea::make('description')
                ->label('Keterangan')
                ->columnSpanFull(),
            FileUpload::make('certificate_file')
                ->label('File Sertifikat')
                ->columnSpanFull(),
        ])->columns(2);
    }

    public function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->label('Nama Prestasi'),
            TextColumn::make('organizer')->label('Penyelenggara'),
            TextColumn::make('date')->label('Tanggal')->date(),
        ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('Tambah Prestasi'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
