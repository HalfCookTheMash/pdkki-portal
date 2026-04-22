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

class ViolationsRelationManager extends RelationManager
{
    protected static string $relationship = 'violations';
    protected static ?string $title = 'Pelanggaran';

    public function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('type')
                ->label('Jenis Pelanggaran')
                ->required(),
            DatePicker::make('date')
                ->label('Tanggal Pelanggaran'),
            TextInput::make('sanction')
                ->label('Sanksi')
                ->required(),
            Textarea::make('description')
                ->label('Keterangan')
                ->columnSpanFull(),
            FileUpload::make('evidence_file')
                ->label('File Bukti')
                ->columnSpanFull(),
        ])->columns(2);
    }

    public function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('type')->label('Jenis Pelanggaran'),
            TextColumn::make('date')->label('Tanggal')->date(),
            TextColumn::make('sanction')->label('Sanksi')
        ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('Tambah Pelanggaran'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
