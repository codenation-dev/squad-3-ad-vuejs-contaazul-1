﻿// <auto-generated />
using System;
using CentralErrosApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CentralErrosApi.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200416072121_Version1")]
    partial class Version1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3");

            modelBuilder.Entity("CentralErrosApi.Model.Log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Data")
                        .HasColumnType("TEXT");

                    b.Property<string>("Detalhes")
                        .HasColumnType("TEXT");

                    b.Property<int>("Frequencia")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Level")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Local")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Origem")
                        .HasColumnType("TEXT");

                    b.Property<string>("Titulo")
                        .HasColumnType("TEXT");

                    b.Property<string>("TokenUsuario")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("CentralErrosApi.Model.Usuario", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Senha")
                        .HasColumnType("TEXT");

                    b.Property<string>("Token")
                        .HasColumnType("TEXT");

                    b.HasKey("Email");

                    b.ToTable("Usuarios");

                    b.HasData(
                        new
                        {
                            Email = "admin@central.com",
                            Senha = "Admin@123"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
